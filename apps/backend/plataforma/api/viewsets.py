import logging

from rest_framework import permissions, viewsets
from plataforma import models
from plataforma.api import serializers

from .permissions import IsInSpecificGroup

logger = logging.getLogger('custom')


class PostViewSet(viewsets.ModelViewSet):
    queryset = models.Post.objects.all()
    serializer_class = serializers.PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        logger.info(f'Novo {self.request.data["title"]}')
        serializer.save()


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = models.Category.objects.all()
    serializer_class = serializers.CategorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        logger.info(f'Novo {self.request.data["title"]}')
        serializer.save()


class CommentViewSet(viewsets.ModelViewSet):
    queryset = models.Comment.objects.all()
    serializer_class = serializers.CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        logger.info(f'Novo {self.request.data["title"]}')
        serializer.save()
