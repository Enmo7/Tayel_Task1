

import 'dart:io';

import 'package:flutter/rendering.dart';
import 'package:image_picker/image_picker.dart';

class ImagePickerscustom {

    File? selectedImage;
  final ImagePicker _picker = ImagePicker();
  Future<void> pickImage(ImageSource source) async {
    try {
      final XFile? pickedFile = await _picker.pickImage(
        source: source,
        maxWidth: 1080,
        maxHeight: 1080,
      );

      if (pickedFile != null) {
        
          selectedImage = File(pickedFile.path);

        
      }
    } catch (e) {
      debugPrint("Error picking image: $e");
    }
  }
}