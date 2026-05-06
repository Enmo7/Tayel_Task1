import 'package:flutter/material.dart';

class RecentStaticWidget extends StatelessWidget {
  const RecentStaticWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
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
                );
  }
}