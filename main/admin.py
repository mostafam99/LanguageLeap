from django.contrib import admin
from .models import User, TopicNotes, Course, PracticeQuestion

# Register your models here.

admin.site.register(User)
admin.site.register(TopicNotes)
admin.site.register(Course)
admin.site.register(PracticeQuestion)
