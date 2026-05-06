import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:gap/gap.dart';

Widget buttonOpenGallery(VoidCallback onpres) {
  return SizedBox(
    width: 250,
    child: ElevatedButton(
      style: ElevatedButton.styleFrom(
        overlayColor: Colors.white,
        backgroundColor: Colors.black,
      ),
      onPressed: () {
        onpres();
      },
      child: const Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          FaIcon(FontAwesomeIcons.fileImage),
          Gap(5),
          Text("Browse images", style: TextStyle(color: Colors.white)),
        ],
      ),
    ),
  );
}
