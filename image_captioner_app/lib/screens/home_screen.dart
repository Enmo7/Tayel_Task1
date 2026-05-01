// import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:frist_project/widgets/image_res.dart';
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
      backgroundColor: Colors.black,
      appBar: AppBar(
        backgroundColor: Color(0xFF282828),
        elevation: 1,
        title: Row(
          children: [
            Image(
              width: 100,
              height: 100,
              image: AssetImage("assets/images/tayel.png"),
            ),
            Gap(10),
            Text(
              "Image Captioner",
              style: TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.w900,
                fontSize: 25,
              ),
            ),
          ],
        ),
      ),
      body: ListView(
        children: [
          Column(
            children: [
              Padding(
                padding: const EdgeInsets.only(top: 30),
                child: Center(
                  child: Column(
                    children: [
                      Text.rich(
                        textAlign: TextAlign.center,
                        TextSpan(
                          style: TextStyle(
                            fontSize: 40,
                            color: Colors.white,
                            fontWeight: FontWeight.w900,
                          ),
                          text: "Turn any image\ninto a ",
                          children: [
                            TextSpan(
                              text: "smart\ncaption \n",
                              style: TextStyle(color: Colors.deepPurpleAccent),
                            ),
                            TextSpan(
                              style: TextStyle(
                                color: Color(0xFF808080),
                                fontSize: 20,
                                height: 1.5,
                              ),
                              text:
                                  "Upload an image and let AI descripe\n it in one clear sentence",
                            ),
                          ],
                        ),
                      ),
                      Column(),
                    ],
                  ),
                ),
              ),
              Gap(10),
              ImageWidget(),
              Gap(15),
              Container(
                decoration: BoxDecoration(),
                child: Column(
                  children: [
                    Column(
                      children: [
                        featureText(Icons.done, "High Fidelity AI"),
                        featureText(Icons.done, "Optimized for Social"),
                        featureText(Icons.done, "Private & Secure"),
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

Widget featureText(IconData icon, String text) {
  return Row(
    mainAxisAlignment: MainAxisAlignment.center,
    children: [
      Container(
        width: 20,
        height: 20,
        decoration: BoxDecoration(
          color: Colors.black,
          shape: BoxShape.circle,
          border: Border.all(color: Colors.grey),
        ),
        child: Icon(icon, color: Colors.blueGrey, size: 15),
      ),
      SizedBox(width: 8, height: 40),
      Text(text, style: TextStyle(color: Colors.blueGrey, fontSize: 16)),
    ],
  );
}
