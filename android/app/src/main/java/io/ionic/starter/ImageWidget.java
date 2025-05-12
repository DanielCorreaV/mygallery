package io.ionic.starter;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.os.Handler;
import android.os.Looper;
import android.widget.RemoteViews;
import android.content.SharedPreferences;

import com.bumptech.glide.Glide;
import com.bumptech.glide.request.target.AppWidgetTarget;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.Random;

public class ImageWidget extends AppWidgetProvider {

  private static final Handler handler = new Handler(Looper.getMainLooper());
  private static final int UPDATE_INTERVAL = 5000; // 5 segundos
  private static final Runnable[] updateRunnables = new Runnable[1]; // soporte para 1 instancia del widget


  @Override
  public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
    for (int i = 0; i < appWidgetIds.length; i++) {
      final int widgetId = appWidgetIds[i];

      updateRunnables[0] = new Runnable() {
        @Override
        public void run() {
          updateWidget(context, appWidgetManager, widgetId);
          handler.postDelayed(this, UPDATE_INTERVAL);
        }
      };

      handler.post(updateRunnables[0]); // inicia el ciclo
    }
  }


  private void updateWidget(Context context, AppWidgetManager manager, int widgetId) {
    SharedPreferences prefs = context.getSharedPreferences("CapacitorStorage", Context.MODE_PRIVATE);
    String json = prefs.getString("widgetImages", null);

    if (json == null) return;

    try {
      JSONArray images = new JSONArray(json);
      if (images.length() == 0) return;

      int index = new Random().nextInt(images.length());
      JSONObject obj = images.getJSONObject(index);

      String imageUrl = obj.getString("url");
      String description = obj.getString("description");

      RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget_image);
      views.setTextViewText(R.id.widget_description, description);

      AppWidgetTarget awt = new AppWidgetTarget(context, R.id.widget_image, views, widgetId);
      Glide.with(context.getApplicationContext())
        .asBitmap()
        .load(imageUrl)
        .into(awt);

      manager.updateAppWidget(widgetId, views);
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  @Override
  public void onDeleted(Context context, int[] appWidgetIds) {
    handler.removeCallbacks(updateRunnables[0]);
  }


}
