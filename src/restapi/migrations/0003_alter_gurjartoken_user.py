# Generated by Django 4.2.1 on 2023-05-10 14:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('restapi', '0002_alter_gurjartoken_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gurjartoken',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='auth_token', to='restapi.gurjaruser'),
        ),
    ]
