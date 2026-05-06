

import 'dart:convert';

CaptionAi captionAiFromJson(String str) => CaptionAi.fromJson(json.decode(str));

String captionAiToJson(CaptionAi data) => json.encode(data.toJson());

class CaptionAi {
    final String? caption;

    CaptionAi({
        this.caption,
    });

    factory CaptionAi.fromJson(Map<String, dynamic> json) => CaptionAi(
        caption: json["caption"],
    );

    Map<String, dynamic> toJson() => {
        "caption": caption,
    };
}
