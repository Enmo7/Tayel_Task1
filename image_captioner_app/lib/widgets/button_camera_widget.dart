import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:gap/gap.dart';

Widget butonOpenCamera(VoidCallback onprees) {
  return SizedBox(
    width: 250,
    child: ElevatedButton(
      onPressed: () {
        onprees();
      },
      style: ElevatedButton.styleFrom(
        backgroundColor: Colors.white,
        overlayColor: Colors.black,
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          FaIcon(FontAwesomeIcons.camera),
          Gap(5),
          Text("Take photo", style: TextStyle(color: Colors.black)),
        ],
      ),
    ),
  );
}
