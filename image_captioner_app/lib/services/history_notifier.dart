import 'package:flutter/foundation.dart';

class RecentCaptionData {
  final String? imagePath;
  final String? imageUrl;
  final String caption;

  RecentCaptionData({
    this.imagePath,
    this.imageUrl,
    required this.caption,
  });
}

/// A global notifier that holds the recent caption data
final ValueNotifier<RecentCaptionData?> historyNotifier =
    ValueNotifier<RecentCaptionData?>(null);
