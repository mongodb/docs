use actix_web::{get, web, HttpResponse, Responder};

use crate::{
    AppState,
    models::RestaurantRow,
    services::restaurant_queries,
};

// Test endpoint to fetch all restaurants
#[get("/restaurants")]
async fn get_restaurants(data: web::Data<AppState>) -> impl Responder {
    let result = restaurant_queries::fetch_all(&data.restaurants).await;
    match result {
        Ok(rows) => {
            let html = render_table_page("All Restaurants", &rows);
            HttpResponse::Ok()
                .content_type("text/html; charset=utf-8")
                .body(html)
        }
        Err(e) => HttpResponse::InternalServerError().body(format!("DB error: {e}")),
    }
}

// Endpoint to fetch restaurants by borough. Queens is used as an example.
#[get("/browse")]
async fn get_restaurants_by_borough(data: web::Data<AppState>) -> impl Responder {
    let borough = "Queens"; // For demonstration, we use a fixed borough. This could be made dynamic.
    let name = "Moon";      // For demonstration, we use a fixed name filter. This could be made dynamic.
    let result = restaurant_queries::fetch_by_borough(&data.restaurants, borough, name).await;
    match result {
        Ok(rows) => {
            let title = format!(r#"{} Restaurants with "{}" in the Name"#, borough, name);
            let html = render_table_page(&title, &rows);
            HttpResponse::Ok()
                .content_type("text/html; charset=utf-8")
                .body(html)
        }
        Err(e) => HttpResponse::InternalServerError().body(format!("DB error: {e}")),
    }
}

// HTML Renderer

fn render_table_page(title: &str, rows: &[RestaurantRow]) -> String {
    let mut html = String::new();

    html.push_str(r#"
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script src="https://cdn.tailwindcss.com"></script>
<title>"#);
    html.push_str(title);
    html.push_str(r#"</title>
</head>
<body class="w-full">
"#);

    // Navigation Bar
    html.push_str(r#"
<nav class="bg-white px-6 py-2 shadow-md w-full">
  <div class="flex justify-between items-center">
    <a href="/restaurants">
      <img
        alt="MongoDB Logo"
        class="h-10 inline"
        src="https://d3cy9zhslanhfa.cloudfront.net/media/3800C044-6298-4575-A05D5C6B7623EE37/4B45D0EC-3482-4759-82DA37D8EA07D229/webimage-8A27671A-8A53-45DC-89D7BF8537F15A0D.png"
      />
    </a>
    <a href="/browse" class="text-lime-800 text-lg font-semibold hover:text-lime-700">
      Browse
    </a>
  </div>
</nav>
"#);

    // Page Title
    html.push_str(r#"<h2 class="text-lg font-semibold px-6 py-4">"#);
    html.push_str(title);
    html.push_str("</h2>");

    // Table Wrapper
    html.push_str(
        r#"<div class="border border-gray-200 shadow-md rounded-lg overflow-hidden mx-6 mb-6">
  <div class="relative w-full overflow-auto">
    <table class="w-full caption-bottom text-sm">
      <thead class="[&_tr]:border-b bg-gray-50">
        <tr class="border-b transition-colors hover:bg-muted/50">
          <th class="px-4 py-3 text-left text-sm font-bold text-gray-700 w-1/3">
            Name
          </th>
          <th class="px-4 py-3 text-left text-sm font-bold text-gray-700 w-1/3">
            Borough
          </th>
          <th class="px-4 py-3 text-left text-sm font-bold text-gray-700 w-1/3">
            Cuisine
          </th>
        </tr>
      </thead>
      <tbody class="[&_tr:last_child]:border-0">
"#,
    );

    // Table Rows
    for row in rows {
        html.push_str(r#"<tr class="border-b transition-colors hover:bg-gray-50">"#);

        html.push_str(r#"<td class="p-4 align-middle">"#);
        html.push_str(row.name.as_deref().unwrap_or(""));
        html.push_str("</td>");

        html.push_str(r#"<td class="p-4 align-middle">"#);
        html.push_str(row.borough.as_deref().unwrap_or(""));
        html.push_str("</td>");

        html.push_str(r#"<td class="p-4 align-middle">"#);
        html.push_str(row.cuisine.as_deref().unwrap_or(""));
        html.push_str("</td>");

        html.push_str("</tr>");
    }

    // Closing tags
    html.push_str(r#"
      </tbody>
    </table>
  </div>
</div>
"#);

    html.push_str("</body></html>");

    html
}