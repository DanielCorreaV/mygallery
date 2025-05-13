package io.ionic.starter;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.widget.RemoteViews;
import android.content.SharedPreferences;
import android.os.Handler;

import com.bumptech.glide.Glide;
import com.bumptech.glide.request.target.AppWidgetTarget;

import org.json.JSONArray;
import org.json.JSONObject;

public class ImageWidget extends AppWidgetProvider {

  private final Handler handler = new Handler();
  private Runnable updateRunnable;

  @Override
  public void onUpdate(Context context, AppWidgetManager manager, int[] appWidgetIds) {
    for (int appWidgetId : appWidgetIds) {
      updateWidget(context, manager, appWidgetId);
    }

    updateRunnable = new Runnable() {
      @Override
      public void run() {
        for (int appWidgetId : appWidgetIds) {
          updateWidget(context, manager, appWidgetId);
        }
        handler.postDelayed(this, 5000); // Repetir cada 5 segundos
      }
    };
    handler.postDelayed(updateRunnable, 5000);
  }

  private void updateWidget(Context context, AppWidgetManager manager, int widgetId) {
    SharedPreferences prefs = context.getSharedPreferences("CapacitorStorage", Context.MODE_PRIVATE);
    String json = prefs.getString("widgetImages", null);
    int currentIndex = prefs.getInt("widgetIndex", 0);

    if (json == null) return;

    try {
      JSONArray images = new JSONArray(json);
      if (images.length() == 0) return;

      // Ciclo secuencial: volver al inicio si se pasa del último
      if (currentIndex >= images.length()) {
        currentIndex = 0;
      }

      JSONObject obj = images.getJSONObject(currentIndex);
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

      // Guardar el siguiente índice para la próxima vez
      prefs.edit().putInt("widgetIndex", currentIndex + 1).apply();

    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
