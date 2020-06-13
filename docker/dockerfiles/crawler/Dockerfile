FROM python:3.7.7

WORKDIR /crawlerContainner

ADD ./crawler /crawlerContainner

RUN curl -O https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-293.0.0-linux-x86_64.tar.gz

RUN curl -O https://chromedriver.storage.googleapis.com/83.0.4103.39/chromedriver_linux64.zip

RUN tar zxvf google-cloud-sdk-293.0.0-linux-x86_64.tar.gz

RUN unzip chromedriver_linux64.zip

RUN ./google-cloud-sdk/install.sh

ENV GOOGLE_APPLICATION_CREDENTIALS ./accessKeyGoogleCloudNLP.json

RUN ./google-cloud-sdk/bin/gcloud auth activate-service-account --key-file accessKeyGoogleCloudNLP.json

RUN ./google-cloud-sdk/bin/gcloud config set project nlptutorial-1591598287452

RUN pip install --trusted-host pypi.python.org -r requirement.txt

CMD ["python", "main.py"]


















# RUN apt-get update

# RUN apt-get -y install wget

# RUN apt-get -y install unzip

# RUN wget -c https://chromedriver.storage.googleapis.com/83.0.4103.39/chromedriver_linux64.zip

# # Add the Cloud SDK distribution URI as a package source
# RUN apt-get install -y apt-transport-https ca-certificates gnupg

# RUN echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
# # Import the Google Cloud Platform public key
# RUN wget https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -

# # Update the package list and install the Cloud SDK
# RUN apt-get install -y google-cloud-sdk

# RUN unzip chromedriver_linux64.zip



# RUN pip install --trusted-host pypi.python.org -r requirement.txt

