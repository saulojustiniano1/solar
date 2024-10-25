from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from plataforma.api.router import post_router, category_router, comment_router
from rest_framework_simplejwt.views import (
    TokenObtainPairView, TokenRefreshView)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/post/', include(post_router.urls)),
    path('api/category/', include(category_router.urls)),
    path('api/comment/', include(comment_router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
