from rest_framework import routers
from plataforma.api import viewsets

post_router = routers.DefaultRouter()
post_router.register('post', viewsets.PostViewSet)

category_router = routers.DefaultRouter()
category_router.register('category', viewsets.CategoryViewSet)

comment_router = routers.DefaultRouter()
comment_router.register('comment', viewsets.CommentViewSet)
