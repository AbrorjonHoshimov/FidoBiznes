package com.example.fidobiznesserver.controller;

import com.example.fidobiznesserver.Payload.DeliveryType;
import com.example.fidobiznesserver.Payload.FormDocInfo;
import com.example.fidobiznesserver.repository.DeliveryTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/api/del_type")
@RestController
public class DeliveryTypeController {

    @Autowired
    DeliveryTypeRepository deliveryTypeRepository;

    @GetMapping("/list")
    public HttpEntity<?> getAll(){
        List<DeliveryType> list = deliveryTypeRepository.list();
        return ResponseEntity.ok(list);
    }
//    @GetMapping("/getOne")
//    public HttpEntity<?> getOne(){
//        List<FormDocInfo> formDoc = deliveryTypeRepository.getFormDoc();
//        return ResponseEntity.ok(formDoc);
//    }
}
