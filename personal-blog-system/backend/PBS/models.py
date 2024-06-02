from django.db import models
from django.conf import settings

class Post(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    blogId = models.CharField(max_length=200, unique=True)
    username = models.CharField(max_length=200)
    userAvatar = models.URLField() 
    date = models.DateTimeField(auto_now_add=True)
    title = models.TextField()
    content = models.TextField()
    imageUrl = models.URLField()

class UserProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    avatar = models.URLField(blank=True)
    bio = models.TextField(blank=True)

    def __str__(self):
        return self.user.username

