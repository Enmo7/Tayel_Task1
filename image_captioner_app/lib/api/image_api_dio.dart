import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:pretty_dio_logger/pretty_dio_logger.dart';

class ImageApi {
  final _dio = Dio();















  ImageApi() {
    _dio.interceptors.add(PrettyDioLogger(

        requestHeader: true,
        requestBody: true,
        responseBody: true,
        responseHeader: false,
        error: true,
        compact: true,
        maxWidth: 90,
        enabled: kDebugMode,
        filter: (options, args){ 
            if(options.path.contains('/posts')){
              return false;
            }
            return !args.isResponse || !args.hasUint8ListData;
          }
    ));
  }
}
