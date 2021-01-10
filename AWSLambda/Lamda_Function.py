from __future__ import print_function

import boto3
import json
import base64

print('Loading function')

rekognition = boto3.client('rekognition')



# --------------- Main handler ------------------


def lambda_handler(event, context):
    encodedImage = event['imageInBase64']
    decodedImage = base64.b64decode(encodedImage + b'===')
    response = rekognition.recognize_celebrities(Image={"Bytes":decodedImage})
    return response

    