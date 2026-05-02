// import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:frist_project/widgets/feature_text.dart';
import 'package:frist_project/widgets/recent_caption.dart';
import 'package:frist_project/widgets/image_widget.dart';
import 'package:gap/gap.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 2,
        title: Row(
          children: [
            CircleAvatar(
              backgroundColor: Colors.black,
              child: FaIcon(FontAwesomeIcons.image, color: Colors.white),
            ),
            Gap(10),
            Column(
              children: [
                Text(
                  "Image Captioner",
                  style: TextStyle(fontWeight: FontWeight.w900),
                ),
                Padding(
                  padding: const EdgeInsets.only(right: 15),
                  child: Text(
                    "Vision notes in seconds",
                    style: TextStyle(fontSize: 14, color: Color(0xff414141)),
                  ),
                ),
              ],
            ),
          ],
        ),
        actions: [
          Padding(
            padding: const EdgeInsets.only(right: 10, bottom: 7),
            child: Container(
              width: 110,
              height: 30,
              decoration: BoxDecoration(
                color: Colors.blueGrey.withOpacity(0.1),
                border: Border.all(color: Colors.white38, width: 1.5),
                borderRadius: BorderRadius.circular(50),
              ),
              child: Padding(
                padding: const EdgeInsets.only(left: 7),
                child: Row(
                  children: [
                    FaIcon(
                      FontAwesomeIcons.wandMagicSparkles,
                      size: 15,
                      color: Colors.blue,
                    ),
                    Text("AI assisted"),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
      body: ListView(
        children: [
          Column(
            children: [
              Padding(
                padding: const EdgeInsets.symmetric(
                  horizontal: 24.0,
                  vertical: 20.0,
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      "VISUAL CAPTION STUDIO",
                      style: TextStyle(
                        color: Colors.blueAccent,
                        fontSize: 12,
                        fontWeight: FontWeight.bold,
                        letterSpacing: 1.2,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      "Turn images into crisp captions.",
                      style: TextStyle(
                        color: Colors.black87,
                        fontSize: 32,
                        fontWeight: FontWeight.w900,
                        height: 1.1,
                      ),
                    ),

                    Text(
                      "Upload one or more images, watch the analyzer inspect visual regions, then copy the typed caption when it lands.",
                      style: TextStyle(
                        color: Colors.grey[600],
                        fontSize: 13,
                        height: 1.5,
                      ),
                    ),
                  ],
                ),
              ),
              Gap(10),
              ImageWidget(),
              Gap(15),
              Container(
                width: double.infinity,
                margin: EdgeInsetsGeometry.only(left: 5),
                decoration: BoxDecoration(),
                child: Column(
                  children: [
                    Row(
                      children: [
                        featureText(Icons.done, "SUBJECT\nAWARE"),
                        featureText(Icons.done, "MOOD\nDETECTION"),
                        featureText(Icons.done, "COPY READY"),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
          Gap(20),
          ImageRestext(),
        ],
      ),
    );
  }
}
