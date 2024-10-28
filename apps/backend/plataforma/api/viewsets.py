from rest_framework import permissions, viewsets, filters
from plataforma import models
from plataforma.api import serializers


class PostViewSet(viewsets.ModelViewSet):
    queryset = models.Post.objects.all().order_by('id')
    serializer_class = serializers.PostSerializer
    permission_classes = [permissions.IsAuthenticated]


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = models.Category.objects.all().order_by('id')
    serializer_class = serializers.CategorySerializer
    permission_classes = [permissions.IsAuthenticated]


class CommentViewSet(viewsets.ModelViewSet):
    queryset = models.Comment.objects.all().order_by('id')
    serializer_class = serializers.CommentSerializer
    permission_classes = [permissions.IsAuthenticated]
