package com.example.fidobiznesserver.controller;

import com.example.fidobiznesserver.Payload.ApiResponse;
import com.example.fidobiznesserver.Payload.Attachment;
import com.example.fidobiznesserver.repository.AttachmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletResponse;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Iterator;
import java.util.UUID;

@RestController
@RequestMapping("/attachment")
public class AttachmentController {
    @Autowired
    AttachmentRepository attachmentRepository;
    private static final String uploadDirectory = "upload";

    @PostMapping("/uploadSytem")
    public HttpEntity<?> uploadFileToSystem(MultipartHttpServletRequest request) throws IOException {
        Iterator<String> fileNames = request.getFileNames();
        MultipartFile file = request.getFile(fileNames.next());
        if (file != null) {
            Attachment attachment = new Attachment();
            String originalFilename = file.getOriginalFilename();
            attachment.setOriginal_name(originalFilename);
            attachment.setSize(file.getSize());
            attachment.setContent_type(file.getContentType());
            String[] split = originalFilename.split("\\.");
            String name = UUID.randomUUID().toString() + "." + split[split.length - 1];
            attachment.setName(name);
            Integer upload = attachmentRepository.upload(attachment);
            Path path = Paths.get(uploadDirectory + "/" + name);
            Files.copy(file.getInputStream(), path);
            return ResponseEntity.status(upload != null ? 201 : 409).body(upload);
        }
        return null;
    }

    @GetMapping("/download/{id}")
    public void getFilefromSystem(@PathVariable int id,
                                  HttpServletResponse response) throws IOException {
        Attachment attachment = attachmentRepository.findById(id);
        String originalName = attachment.getOriginal_name();
        response.setHeader("Content-Disposition", "inline;filename=\"" + originalName + "\"");
        response.setContentType(attachment.getContent_type());

        FileInputStream fileInputStream = new FileInputStream(uploadDirectory + "/" + attachment.getName());

        FileCopyUtils.copy(fileInputStream, response.getOutputStream());
    }
}
