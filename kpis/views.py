from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import KPI
from .serializers import KPISerializer


class KPIViewSet(viewsets.ModelViewSet):

    queryset = KPI.objects.all().order_by("-created_at")

    serializer_class = KPISerializer


@api_view(["GET"])
def project_kpi_summary(request, project_id):

    kpis = KPI.objects.filter(project_id=project_id)

    total = kpis.count()

    on_track = kpis.filter(status="ON_TRACK").count()

    at_risk = kpis.filter(status="AT_RISK").count()

    off_track = kpis.filter(status="OFF_TRACK").count()

    overall_status = "ON_TRACK"

    if off_track > 0:
        overall_status = "OFF_TRACK"

    elif at_risk > 0:
        overall_status = "AT_RISK"

    return Response({
        "total_kpis": total,
        "on_track": on_track,
        "at_risk": at_risk,
        "off_track": off_track,
        "overall_status": overall_status
    })