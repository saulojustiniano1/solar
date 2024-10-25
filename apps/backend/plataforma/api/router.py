from rest_framework import routers
from plataforma.api import viewsets

post_router = routers.DefaultRouter()
post_router.register('', viewsets.PostViewSet)

category_router = routers.DefaultRouter()
category_router.register('', viewsets.CategoryViewSet)

comment_router = routers.DefaultRouter()
comment_router.register('', viewsets.CommentViewSet)
