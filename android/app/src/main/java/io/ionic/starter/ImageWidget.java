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
import java.util.HashMap;
import java.util.Map;

public class ImageWidget extends AppWidgetProvider {
  private static final int UPDATE_INTERVAL = 5000;
  private static final Handler handler = new Handler(Looper.getMainLooper());
  private static final Map<Integer, Runnable> updateRunnables = new HashMap<>();

  @Override
  public void onUpdate(Context context, AppWidgetManager manager, int[] appWidgetIds) {
    for (int widgetId : appWidgetIds) {
      startRepeatingUpdate(context, manager, widgetId);
    }
  }

  @Override
  public void onDisabled(Context context) {
    // Detener todos los updates cuando se elimina el último widget
    for (Runnable r : updateRunnables.values()) {
      handler.removeCallbacks(r);
    }
    updateRunnables.clear();
  }

  private void startRepeatingUpdate(Context context, AppWidgetManager manager, int widgetId) {
    Runnable runnable = new Runnable() {
      @Override
      public void run() {
        updateWidget(context, manager, widgetId);
        handler.postDelayed(this, UPDATE_INTERVAL);
      }
    };

    updateRunnables.put(widgetId, runnable);
    handler.post(runnable);
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
        .override(300, 300)
        .into(awt);

      manager.updateAppWidget(widgetId, views);
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  @Override
  public void onDeleted(Context context, int[] appWidgetIds) {
    for (int widgetId : appWidgetIds) {
      Runnable r = updateRunnables.get(widgetId);
      if (r != null) {
        handler.removeCallbacks(r);
        updateRunnables.remove(widgetId);
      }
    }
  }

}
