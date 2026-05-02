import 'dart:io';
import 'package:dotted_border/dotted_border.dart';
import 'package:flutter/material.dart';
import 'package:frist_project/services/image_picker.dart';
import 'package:frist_project/widgets/button_camera_widget.dart';
import 'package:frist_project/widgets/button_gallery_widget.dart';
import 'package:frist_project/widgets/upload_image_container.dart';
import 'package:image_picker/image_picker.dart';

class ImageWidget extends StatefulWidget {
  const ImageWidget({super.key});
  @override
  State<ImageWidget> createState() => _ImageWidgetState();
}

class _ImageWidgetState extends State<ImageWidget> {
  ImagePickerscustom imageshandler = ImagePickerscustom();

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Container(
          width: 350,
          height: 350,
          decoration: BoxDecoration(
            color: Color(0xFFF8FAFC),
            borderRadius: BorderRadius.circular(24),
            border: Border.all(color: Colors.white.withOpacity(0.4)),
          ),
          child: DottedBorder(
            options: RoundedRectDottedBorderOptions(
              dashPattern: const [20, 2],
              color: Colors.blueGrey.withOpacity(0.2),
              strokeWidth: 3,
              radius: const Radius.circular(20),
              borderPadding: const EdgeInsets.all(8),
            ),
            child: imageshandler.selectedImage == null
                ? Padding(
                    padding: const EdgeInsets.only(left: 35),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Container(
                          decoration: BoxDecoration(
                            shape: BoxShape.rectangle,
                            borderRadius: BorderRadius.circular(10),
                            border: Border.all(color: Colors.white10),
                            color: Colors.white,
                          ),
                          child: IconButton(
                            onPressed: () async {
                              await imageshandler.pickImage(ImageSource.gallery);
                              setState(() {});
                            },
                            icon: const Icon(
                              Icons.cloud_upload_outlined,
                              color: Colors.black,
                              size: 20,
                            ),
                          ),
                        ),
                        const SizedBox(height: 32),
                        const Text(
                          'Drop images to caption',
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            color: Colors.black,
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                            height: 1.4,
                          ),
                        ),
                        const SizedBox(height: 17, width: 70),
                        const Text(
                          textAlign: TextAlign.center,
                          'Upload JPG, PNG, or WebP files. The app will read\nthe image and produce a clean one-sentence\ncaption.',
                          style: TextStyle(color: Colors.black, fontSize: 12),
                        ),
                        buttonOpenGallery(() async {
                          await imageshandler.pickImage(ImageSource.gallery);
                          setState(() {});
                        }),
                        butonOpenCamera(() async {
                          await imageshandler.pickImage(ImageSource.camera);
                          setState(() {});
                        }),
                      ],
                    ),
                  )
                : UploadImageContainer(
                    image: imageshandler.selectedImage,
                    onAddPressed: () async {
                      await imageshandler.pickImage(ImageSource.gallery);
                      setState(() {});
                    },
                    onCameraPressed: () async {
                      await imageshandler.pickImage(ImageSource.camera);
                      setState(() {});
                    },
                    onDeletePressed: () {
                      setState(() {
                        imageshandler.selectedImage = null;
                      });
                    },
                  ),
          ),
        ),
      ),
    );
  }
}
