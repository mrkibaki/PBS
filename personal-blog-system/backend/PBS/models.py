from django.db import models
from django.contrib.auth.models import User

class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    blogId = models.CharField(max_length=200, unique=True)
    username = models.CharField(max_length=200)
    userAvatar = models.URLField()
    date = models.DateTimeField(auto_now_add=True)
    title = models.TextField()
    content = models.TextField()
    imageUrl = models.URLField()
    blog_count = models.IntegerField(default=0)

    def save(self, *args, **kwargs):
        if not self.blogId:
            user = User.objects.get(username=self.username)
            user.blog_count += 1
            user.save()
            self.blogId = f'{self.username}{user.blog_count}'
            self.user = user  # Assign the User object to self.user
        super().save(*args, **kwargs)
        
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.URLField(blank=True)
    bio = models.TextField(blank=True)

    def __str__(self):
        return self.user.username
