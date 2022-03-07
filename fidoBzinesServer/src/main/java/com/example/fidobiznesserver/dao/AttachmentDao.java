package com.example.fidobiznesserver.dao;

import com.example.fidobiznesserver.Payload.ApiResponse;
import com.example.fidobiznesserver.Payload.Attachment;

import java.util.Optional;

public interface AttachmentDao <T>{

    Integer upload(Attachment attachment);
}
