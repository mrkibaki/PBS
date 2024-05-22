from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Post
from django.views.generic import ListView
from django.contrib.auth.models import User 
import json
from django.contrib.auth import authenticate, login

def post_list(request):
    print("post_list view is called")  # add this line
    posts = Post.objects.all().values()  # get all posts
    post_list = list(posts)  # convert QuerySet to list
    return JsonResponse(post_list, safe=False)


@csrf_exempt
def create_post(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        userAvatar = data.get('userAvatar')
        title = data.get('title')
        content = data.get('content')
        imageUrl = data.get('imageUrl')
        
        if not request.user.is_authenticated:
            return JsonResponse({'message': 'User is not authenticated'})
        
        user = request

        post = Post(user=user,
                    userAvatar=userAvatar, 
                    title=title, 
                    content=content, 
                    imageUrl=imageUrl)
        post.save()

        return JsonResponse({'message': 'Post created successfully'})

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'status': 'success'})
        else:
            return JsonResponse({'status': 'error'})
    else:
        return JsonResponse({'status': 'Invalid request method'})