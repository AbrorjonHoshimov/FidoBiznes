package com.example.fidobiznesserver.controller;

import com.example.fidobiznesserver.Payload.DeliveryType;
import com.example.fidobiznesserver.Payload.DocumentSender;
import com.example.fidobiznesserver.repository.DeliveryTypeRepository;
import com.example.fidobiznesserver.repository.DocumentSenderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/api/doc_sender")
@RestController
public class DocSenderController {

    @Autowired
    DocumentSenderRepository documentSenderRepository;

    @GetMapping("/list")
    public HttpEntity<?> getAll() {
        List<DocumentSender> list = documentSenderRepository.list();
        return ResponseEntity.ok(list);
    }
}
