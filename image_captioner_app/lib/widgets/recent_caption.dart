import 'dart:io';
import 'package:flutter/material.dart';
import 'package:frist_project/services/history_notifier.dart';
import 'package:frist_project/data/services/image_caption.dart';

class ImageRestext extends StatefulWidget {
  const ImageRestext({super.key});

  @override
  State<ImageRestext> createState() => _ImageRestextState();
}

class _ImageRestextState extends State<ImageRestext> {
  final ImageCaption _imageCaption = ImageCaption();

  @override
  // void initState() {
  //   super.initState();
  //   _fetchHistory();
  // }

  // void _fetchHistory() async {
  //   final L historyList = await _imageCaption.getHistory();
  //   if (historyList != null && historyList!=null) {
  //     final latest = historyList.;
  //     historyNotifier.value = RecentCaptionData(
  //       imageUrl: latest['image'],
  //       caption: latest['caption'] ?? '',
  //     );
  //   }
  // }

  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder<RecentCaptionData?>(
      valueListenable: historyNotifier,
      builder: (context, recentData, child) {
        bool hasData = false;
        ImageProvider? imageProvider;

        if (recentData != null) {
          if (recentData.imageUrl != null && recentData.imageUrl!.isNotEmpty) {
            hasData = true;
            imageProvider = NetworkImage(recentData.imageUrl!);
          } else if (recentData.imagePath != null) {
            final file = File(recentData.imagePath!);
            if (file.existsSync()) {
              hasData = true;
              imageProvider = FileImage(file);
            }
          }
        }

        return Padding(
          padding: const EdgeInsets.all(16),
          child: Container(
            width: 350,
            decoration: BoxDecoration(
              color: const Color(0xFFF8FAFC),
              borderRadius: BorderRadius.circular(24),
              border: Border.all(color: Colors.blue.withOpacity(0.1)),
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Padding(
                  padding: EdgeInsets.only(top: 25, left: 20, bottom: 16),
                  child: Row(
                    children: [
                      Icon(Icons.history, color: Colors.grey, size: 18),
                      SizedBox(width: 8),
                      Text(
                        "RECENT CAPTIONS",
                        style: TextStyle(
                          color: Colors.grey,
                          fontSize: 14,
                          fontWeight: FontWeight.w700,
                          letterSpacing: 0.5,
                        ),
                      ),
                    ],
                  ),
                ),
                if (hasData && imageProvider != null)
                  Padding(
                    padding: const EdgeInsets.fromLTRB(20, 0, 20, 25),
                    child: Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(color: Colors.grey.shade200),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.black.withOpacity(0.02),
                            blurRadius: 10,
                            offset: const Offset(0, 4),
                          ),
                        ],
                      ),
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          CircleAvatar(
                            radius: 25,
                            backgroundColor: Colors.grey.shade200,
                            backgroundImage: imageProvider,
                          ),
                          const SizedBox(width: 16),
                          Expanded(
                            child: Text(
                              recentData!.caption,
                              style: const TextStyle(
                                fontSize: 14,
                                color: Color(0xFF334155),
                                height: 1.5,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  )
                else
                  Padding(
                    padding: const EdgeInsets.only(bottom: 40, top: 20),
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(
                          Icons.image_not_supported_outlined,
                          size: 48,
                          color: Colors.blueGrey.withOpacity(0.3),
                        ),
                        const SizedBox(height: 16),
                        const Text(
                          "No recent captions yet",
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.w600,
                            color: Color(0xFF475569),
                          ),
                        ),
                        const SizedBox(height: 8),
                        const Text(
                          "Your generated captions will appear here",
                          style: TextStyle(
                            fontSize: 13,
                            color: Color(0xFF94A3B8),
                          ),
                        ),
                      ],
                    ),
                  ),
              ],
            ),
          ),
        );
      },
    );
  }
}
