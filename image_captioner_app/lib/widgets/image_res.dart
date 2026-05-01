import 'package:flutter/material.dart';

class ImageRestext extends StatefulWidget {
  const ImageRestext({super.key});

  @override
  State<ImageRestext> createState() => _ImageRestextState();
}

class _ImageRestextState extends State<ImageRestext> {
  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      height: 300,
      color: Colors.blueGrey,
      child: Column(
        children: [
          Padding(
            padding: const EdgeInsets.only(top: 25, left: 20),
            child: Row(
              children: [
                Text(
                  "RECENT CAPTION",
                  style: TextStyle(
                    color: Colors.grey,
                    fontSize: 20,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ],
            ),
          ),
          Column(
            children: [
              Padding(
                padding: const EdgeInsets.only(top: 50),
                child: Container(
                  width: 50,
                  height: 50,
                  decoration: BoxDecoration(
                    color: const Color.fromARGB(255, 74, 75, 77),
                    borderRadius: BorderRadius.circular(15),
                  ),
                  child: Icon(Icons.recycling_rounded),
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(top: 20),
                child: SizedBox(
                  child: Column(
                    children: [
                      Text(
                        "No captions yet",
                        style: TextStyle(
                          fontWeight: FontWeight.w700,
                          fontSize: 15,
                        ),
                      ),
                      Text(
                        "Your generated captions will appear here.",
                        style: TextStyle(),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
