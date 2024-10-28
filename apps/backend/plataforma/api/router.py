from rest_framework import routers
from plataforma.api import viewsets

post_router = routers.DefaultRouter()
post_router.register('posts', viewsets.PostViewSet)

category_router = routers.DefaultRouter()
category_router.register('categorys', viewsets.CategoryViewSet)

comment_router = routers.DefaultRouter()
comment_router.register('comments', viewsets.CommentViewSet)
