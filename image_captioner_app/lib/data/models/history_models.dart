// To parse this JSON data, do
//
//     final welcome = welcomeFromJson(jsonString);

import 'dart:convert';

Welcome welcomeFromJson(String str) => Welcome.fromJson(json.decode(str));

String welcomeToJson(Welcome data) => json.encode(data.toJson());

class Welcome {
    final List<History>? history;

    Welcome({
        this.history,
    });

    factory Welcome.fromJson(Map<String, dynamic> json) => Welcome(
        history: json["history"] == null ? [] : List<History>.from(json["history"]!.map((x) => History.fromJson(x))),
    );

    Map<String, dynamic> toJson() => {
        "history": history == null ? [] : List<dynamic>.from(history!.map((x) => x.toJson())),
    };
}

class History {
    final String? id;
    final String? image;
    final String? caption;
    final String? date;

    History({
        this.id,
        this.image,
        this.caption,
        this.date,
    });

    factory History.fromJson(Map<String, dynamic> json) => History(
        id: json["id"],
        image: json["image"],
        caption: json["caption"],
        date: json["date"],
    );

    Map<String, dynamic> toJson() => {
        "id": id,
        "image": image,
        "caption": caption,
        "date": date,
    };
}
