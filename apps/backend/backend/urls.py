from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from plataforma.api.router import post_router, category_router, comment_router

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/post', include(post_router.urls)),
    path('api/category', include(category_router.urls)),
    path('api/comment', include(comment_router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
