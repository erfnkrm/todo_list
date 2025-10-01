from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Todo
from .serializers import TodoSerializer


class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Get todo statistics"""
        total = Todo.objects.count()
        completed = Todo.objects.filter(completed=True).count()
        active = total - completed
        
        return Response({
            'total': total,
            'completed': completed,
            'active': active
        })