package io.ionic.starter;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.widget.RemoteViews;
import android.content.SharedPreferences;

import com.bumptech.glide.Glide;
import com.bumptech.glide.request.target.AppWidgetTarget;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.Random;

public class ImageWidget extends AppWidgetProvider {

  @Override
  public void onUpdate(Context context, AppWidgetManager manager, int[] appWidgetIds) {
    for (int appWidgetId : appWidgetIds) {
      updateWidget(context, manager, appWidgetId);
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
}
