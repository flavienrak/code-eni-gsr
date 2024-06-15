from os import getenv
from dotenv import load_dotenv
import pusher

load_dotenv()

PUSHER_APP_ID = getenv("PUSHER_ID")
PUSHER_KEY = getenv("PUSHER_KEY")
PUSHER_SECRET = getenv("PUSHER_SECRET")
PUSHER_CLUSTER = getenv("PUSHER_CLUSTER")


pusher_client = pusher.Pusher(
    app_id=PUSHER_APP_ID,
    key=PUSHER_KEY,
    secret=PUSHER_SECRET,
    cluster=PUSHER_CLUSTER,
    ssl=True,
)
