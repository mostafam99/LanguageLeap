from django import template

register = template.Library()

@register.filter
def in_theme(things, category):
    return things.filter(themes=category).order_by('topicNumber')

@register.filter
def make_language(things):
    return things.replace("IB", "")

@register.filter
def filter_questions(things, question_type):
    return things.filter(questionType=question_type).order_by('difficulty')

@register.filter
def remove_hyphen(things):
    return things.replace("-", " ")

@register.filter
def capitalize(things):
    return things.capitalize()

