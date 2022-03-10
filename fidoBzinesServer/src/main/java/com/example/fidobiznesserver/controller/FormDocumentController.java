package com.example.fidobiznesserver.controller;

import com.example.fidobiznesserver.Payload.ApiResponse;
import com.example.fidobiznesserver.Payload.FilterDto;
import com.example.fidobiznesserver.Payload.FormDoc;
import com.example.fidobiznesserver.Payload.FormDocInfo;
import com.example.fidobiznesserver.repository.FormDocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/form")
public class FormDocumentController {

    @Autowired
    FormDocumentRepository formDocumentRepository;

    @GetMapping("/page")
    public HttpEntity<?> page(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        List<FormDocInfo> pageableObjecyt = formDocumentRepository.pageable(page, size);
        return ResponseEntity.ok(page);
    }

    @GetMapping("/list")
    public HttpEntity<?> getall() {
        List<FormDocInfo> list = formDocumentRepository.list();
        return ResponseEntity.ok(list);
    }

    @PostMapping("/add")
    public HttpEntity<?> add(@RequestBody FormDoc formDoc) {
        ApiResponse apiResponse = formDocumentRepository.create(formDoc);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }

    @GetMapping("/getOne/{id}")
    public HttpEntity<?> getOne(@PathVariable int id) {
        FormDoc formDoc = formDocumentRepository.get(id);
        return ResponseEntity.ok(formDoc);
    }

    @PutMapping("/{id}")
    public HttpEntity<?> update(@RequestBody FormDoc formDoc, @PathVariable int id) {
        ApiResponse update = formDocumentRepository.update(formDoc, id);
        return ResponseEntity.status(update.isSuccess() ? 201 : 409).body(update);
    }

    @DeleteMapping("/{id}")
    public HttpEntity<?> delete(@PathVariable int id) {
        ApiResponse delete = formDocumentRepository.delete(id);
        return ResponseEntity.status(delete.isSuccess() ? 201 : 409).body(delete);
    }

    @GetMapping("/orderByRegNum")
    public HttpEntity<?> orderByRegNum(@RequestParam boolean sort) {
        List<FormDocInfo> formDocInfos = formDocumentRepository.orderByRegNum(sort);
        return ResponseEntity.ok(formDocInfos);
    }

    @GetMapping("/orderByRegDate")
    public HttpEntity<?> orderByRegDate(@RequestParam boolean sort) {
        List<FormDocInfo> formDocInfos = formDocumentRepository.orderByRegDate(sort);
        return ResponseEntity.ok(formDocInfos);
    }
    @GetMapping("/orderBySendNum")
    public HttpEntity<?> orderBySendNum(@RequestParam boolean sort) {
        List<FormDocInfo> formDocInfos = formDocumentRepository.orderBySendNum(sort);
        return ResponseEntity.ok(formDocInfos);
    }
    @GetMapping("/orderBySendDate")
    public HttpEntity<?> orderBySendDate(@RequestParam boolean sort) {
        List<FormDocInfo> formDocInfos = formDocumentRepository.orderBySendDate(sort);
        return ResponseEntity.ok(formDocInfos);
    }
    @GetMapping("/orderByDeliveryType")
    public HttpEntity<?> orderByDeliveryType(@RequestParam boolean sort) {
        List<FormDocInfo> formDocInfos = formDocumentRepository.orderByDeliveryType(sort);
        return ResponseEntity.ok(formDocInfos);
    }
    @GetMapping("/orderBySender")
    public HttpEntity<?> orderBySender(@RequestParam boolean sort) {
        List<FormDocInfo> formDocInfos = formDocumentRepository.orderBySender(sort);
        return ResponseEntity.ok(formDocInfos);
    }
    @GetMapping("/orderByTheme")
    public HttpEntity<?> orderByTheme(@RequestParam boolean sort) {
        List<FormDocInfo> formDocInfos = formDocumentRepository.orderByTheme(sort);
        return ResponseEntity.ok(formDocInfos);
    }
    @GetMapping("/orderByDescription")
    public HttpEntity<?> orderByDescription(@RequestParam boolean sort) {
        List<FormDocInfo> formDocInfos = formDocumentRepository.orderByDescription(sort);
        return ResponseEntity.ok(formDocInfos);
    }
    @GetMapping("/orderByExpireDate")
    public HttpEntity<?> orderByExpireDate(@RequestParam boolean sort) {
        List<FormDocInfo> formDocInfos = formDocumentRepository.orderByExpireDate(sort);
        return ResponseEntity.ok(formDocInfos);
    }

    @PostMapping("/filter")
    public HttpEntity<?>filter(@RequestBody FilterDto filterDto){
        List<FormDocInfo> filter = formDocumentRepository.filter(filterDto);
        return ResponseEntity.ok(filter);
    }
    @GetMapping("/cbGmail/{id}")
    public HttpEntity<?> cbGmail(@PathVariable int id){
        List<FormDocInfo> formDocInfos = formDocumentRepository.cbGmail(id);
        return ResponseEntity.ok(formDocInfos);
    }

}

