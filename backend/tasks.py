from celery import Celery


def make_celery(app):
    celery = Celery(app.import_name,
                    backend=app.config['result_backend'],
                    broker=app.config['CELERY_BROKER_URL'])
    celery.conf.task_serializer = 'pickle'
    celery.conf.result_serializer = 'pickle'
    celery.conf.accept_content = [
        'application/json', 'application/x-python-serialize'
    ]
    celery.conf.update(app.config)

    class ContextTask(celery.Task):
        def __call__(self, *args, **kwargs):
            with app.app_context():
                return self.run(*args, **kwargs)

    celery.Task = ContextTask
    return celery