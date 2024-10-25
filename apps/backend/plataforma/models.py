from django.db import models
from softdelete.models import BaseModel


class Post(BaseModel):
    title = models.CharField(max_length=200)
    content = models.TextField()
    pub_date = models.DateTimeField(auto_now_add=True)
    imagem = models.ImageField(upload_to='post/', null=True, blank=True)

    def __str__(self):
        return self.title


class Category(BaseModel):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Comment(BaseModel):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    content = models.TextField()
    pub_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content
