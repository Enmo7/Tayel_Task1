import 'dart:io';

import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:frist_project/constant/api_constant.dart';
import 'package:frist_project/data/api/api_client.dart';
import 'package:frist_project/data/models/caption_model.dart';
import 'package:frist_project/data/models/history_models.dart';

class ImageCaption {
  ApiClient _apiClient = ApiClient();

  Future<CaptionAi?> getImageCaption(File image) async {
    
   
    print(" this my print: sdasdsafsdfsafs${image.runtimeType}");
    try {
      FormData formData = FormData.fromMap({
        "image": await MultipartFile.fromFile(
          image.path,
          filename: image.path.split('/').last,
        ),
        "mimeType": "image/png",
      });

      Response responseImage = await _apiClient.postData('/', body: formData);
      print(
        "this is the response caption ${CaptionAi.fromJson(responseImage.data).caption}",
      );
      if (responseImage.statusCode == 200 && responseImage.data != null) {
        return CaptionAi.fromJson(responseImage.data);
      }
    } catch (e) {
      if (kDebugMode) {
        print("Error generating caption: $e");
      }
      return null;
    }
    return null;
  }

  Future<Welcome?> getCaptionHistory() async {
    try {
      Response response = await _apiClient.getData("/history");
      if (response.statusCode == 200 && response.data != null) {
        return Welcome.fromJson(response.data);
      }
    } catch (e) {
      if (kDebugMode) {
        print("Error fetching history: $e");
      }
      return null;
    }
    return null;
  }
}
