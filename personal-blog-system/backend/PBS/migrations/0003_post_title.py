# Generated by Django 5.0.6 on 2024-05-22 06:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('PBS', '0002_post_blogid_post_blog_count'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='title',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
    ]
