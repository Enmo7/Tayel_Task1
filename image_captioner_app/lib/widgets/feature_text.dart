
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

Widget featureText(IconData icon, String text) {
  return Padding(
    padding: const EdgeInsets.all(8.0),
    child: Container(
      width: 110,
      height: 40,
      alignment: Alignment.center,
      decoration: BoxDecoration(
        color: Colors.blueGrey.withOpacity(0.1),

        border: Border.all(color: Colors.white38, width: 1),
        borderRadius: BorderRadius.circular(15),
      ),
      child: Padding(
        padding: const EdgeInsets.only(left: 7),
        child: Row(
          children: [
            FaIcon(FontAwesomeIcons.check, size: 15, color: Colors.green),
            Padding(
              padding: const EdgeInsets.only(left: 10),
              child: Text(
                text,
                style: TextStyle(
                  fontSize: 10,
                  fontWeight: FontWeight.w800,
                  color: Color(0xFF475569),
                ),
                textAlign: TextAlign.center,
              ),
            ),
          ],
        ),
      ),
    ),
  );
}

