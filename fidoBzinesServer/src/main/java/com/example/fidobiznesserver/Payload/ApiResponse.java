package com.example.fidobiznesserver.Payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponse {
    private boolean success;
    private String message;
    private Integer saveId;

    public ApiResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }
}
