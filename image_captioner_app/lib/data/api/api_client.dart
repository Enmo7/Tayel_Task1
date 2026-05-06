import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:frist_project/constant/api_constant.dart';
import 'package:pretty_dio_logger/pretty_dio_logger.dart';

class ApiClient {
  final dio = Dio(
    BaseOptions(
      baseUrl: ApiConstant.baseUrl,
      headers: {'Content-Type': 'multipart/form-data'},
    ),
  );

  Future<Response> postData(
    String path, {
    dynamic body,
    Map<String, dynamic>? headrs,
  }) async {
    Response res = await dio.post(
      path,
      data: body,
      options: Options(headers: headrs),
    );
    print(res.data);
    print(res.statusCode);
    return res;
  }

  Future<Response> getData(String path, {Map<String, dynamic>? headrs}) async {
    Response resHistory = await dio.get(
      path,
      options: Options(headers: headrs),
    );
    return resHistory;
  }

  ApiClient() {
    dio.interceptors.add(
      PrettyDioLogger(
        requestHeader: true,
        requestBody: true,
        responseBody: true,
        responseHeader: true,
        error: true,
        compact: true,
        maxWidth: 90,
        enabled: kDebugMode,
        filter: (options, args) {
          if (options.path.contains('/posts')) {
            return false;
          }
          return !args.isResponse || !args.hasUint8ListData;
        },
      ),
    );
  }
}
