package com.example.fidobiznesserver.Payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Attachment {
    private Integer id;
    private String original_name;
    private Long size;
    private String content_type;
    private String name;

    public Attachment(String original_name, Long size, String content_type, String name) {
        this.original_name = original_name;
        this.size = size;
        this.content_type = content_type;
        this.name = name;
    }
}
