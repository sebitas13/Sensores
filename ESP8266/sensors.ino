#include <DHT.h>
#include <DHT_U.h>

#include <ArduinoJson.h>
#include <ESP8266WiFi.h>
#include <WebSocketClient.h>//

#include "config.h"

char path[] = "/";
char host2[] = "192.168.0.2:5000";
const char* host = "192.168.0.2"; 
const uint16_t port = 5000;

int pir = 4;      //D2 -> 4
int vpir = 0;

int ht = 5;
DHT dht(ht,DHT11);
float t,tf,h,st;

int ldr = A0;
int vldr = 0;

WebSocketClient webSocketClient; //
WiFiClient client;

void setup() {
  Serial.begin(115200);
  delay(100);
  pinMode(pir,INPUT);
  dht.begin();
  conexionWifi();
  
  conexionServer();
  
  
}

void loop() {
  

  String data;
  
  if (client.connected()) {
    
    //webSocketClient.sendData("Info to be echoed back");
    webSocketClient.getData(data); // obtenemos los datos del servidor,esta se almacena en la variable "data" que pasamos.
    if (data.length() > 0) {
      Serial.print("Received data: ");
      Serial.println(data);
    }
    
    StaticJsonDocument<200> doc;
    String json;
    
   // vtemp = temperatura();
    vpir = digitalRead(pir);
    vldr = analogRead(ldr);
    h = dht.readHumidity();
    t = dht.readTemperature();
    tf = dht.readTemperature(true);
    st = dht.computeHeatIndex(t,h);
    /*Serial.println("ldr: "+ String(vldr) + " Humedad: " + String(h) + " F : "+String(tf));
    Serial.println("Sensacion termica "+ String(st)+"\n\n");*/
    doc["ldr"] = String(vldr);
    doc["temp_c"] = String(t);
    doc["temp_f"] = String(tf); 
    doc["hume"] = String(h);
    doc["s_ter"] = String(st);
    doc["pir"] = vpir; 
    serializeJson(doc,json);
    webSocketClient.sendData(json);
    
  } else {
    Serial.println("Client disconnected.");
    while (1) {
      // Hang on disconnect.
    }
  }
  
  // Esperar a que el cliente se desconecte por completo
  delay(3000);
}



void conexionWifi(){
  
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.mode(WIFI_STA); //ESP8266 actuará en modo estación (STA, Station), es decir, como un dispositivo que se conecta a un punto de acceso (AP, Access Point)
  WiFi.begin(ssid, password); //guard las credenciales en la memoria flash no volatil

  //Espera que se conecte
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  // Mostrar mensaje de exito y dirección IP asignada
  Serial.println();
  Serial.print("Conectado a:\t");
  Serial.println(WiFi.SSID()); 
  Serial.print("IP address:\t");
  Serial.println(WiFi.localIP());

  delay(5000);    
  
}

void conexionServer(){
  
  Serial.print("connecting to ");
  Serial.print(host);
  Serial.print(':');
  Serial.println(port);
  if (client.connect(host, port)) {
    Serial.println("sending data to server");  
  }else{
    Serial.println("Connection failed.");
    while(1) {
      // Hang on failure
    }
  }

  //Handshake with the server
  //Protocolo para establecer una conexion segura entre el cliente y servidor
  webSocketClient.path = path;
  webSocketClient.host = host2;
  if (webSocketClient.handshake(client)) {
    Serial.println("Handshake successful");
  } else {
    Serial.println("Handshake failed.");
    while(1) {
      // Hang on failure
    }   
  }
  
}