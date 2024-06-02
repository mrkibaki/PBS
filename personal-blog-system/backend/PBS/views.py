from django.forms import ValidationError
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Post, UserProfile
import json
from django.contrib.auth import authenticate, login
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
import uuid
from django.contrib.auth.models import User


def post_list(request):
    print("post_list view is called")  # add this line
    posts = Post.objects.all().values()  # get all posts
    post_list = list(posts)  # convert QuerySet to list
    return JsonResponse(post_list, safe=False)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@csrf_exempt
def create_post(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        userAvatar = data.get('userAvatar')
        title = data.get('title')
        content = data.get('content')
        imageUrl = data.get('imageUrl')
        
        token = request.auth
        user = Token.objects.get(key=token).user
        print('user is: '+ str(user)) 
        
        if not request.user.is_authenticated:
            return JsonResponse({'message': 'User is not authenticated'})
        
        blogId = str(uuid.uuid4())
        
        post = Post(user=user,
                    blogId=blogId,
                    username=username,
                    userAvatar=userAvatar, 
                    title=title, 
                    content=content, 
                    imageUrl=imageUrl)
        try:
            post.full_clean()
        except ValidationError as e:
            return JsonResponse({'message': 'Invalid post data', 'errors': e.message_dict})
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
            token, created = Token.objects.get_or_create(user=user)
            return JsonResponse({'status': 'success', 'token': str(token)})
        else:
            return JsonResponse({'status': 'error'})
    else:
        return JsonResponse({'status': 'Invalid request method'})
    
@csrf_exempt
def delete_post(request, blogId):
    if request.method == 'DELETE':
        try:
            post = Post.objects.get(blogId=blogId)
            post.delete()
            return JsonResponse({'message': 'Post deleted successfully'})
        except Post.DoesNotExist:
            return JsonResponse({'message': 'Post not found'}, status=404)
    else:
        return JsonResponse({'message': 'Invalid request method'}, status=405)
    
def register(self, request):
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return JsonResponse({"message": "Opps, something is missing, did you leave anything blank? :3"}, status=400)

        if User.objects.filter(username=username).exists():
            return JsonResponse({"message": "You are a member of us already, try login :3"}, status=400)

        user = User.objects.create_user(username=username, password=password)
        UserProfile.objects.create(user=user)

        return JsonResponse({"message": "Register successfully, please login :3"}, status=201)