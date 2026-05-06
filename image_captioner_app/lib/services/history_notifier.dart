import 'package:flutter/foundation.dart';

class RecentCaptionData {
  final String imagePath;
  final String caption;

  RecentCaptionData({required this.imagePath, required this.caption});
}

/// A global notifier that holds the recent caption data
final ValueNotifier<RecentCaptionData?> historyNotifier =
    ValueNotifier<RecentCaptionData?>(null);
