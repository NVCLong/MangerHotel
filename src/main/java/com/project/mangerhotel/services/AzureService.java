package com.project.mangerhotel.services;

import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobServiceClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Service
public class AzureService {
    @Autowired
    BlobServiceClient blobServiceClient;
    @Autowired
    BlobContainerClient blobContainerClient;

    public String upload(MultipartFile file) throws IOException {

        //todo uuid
        BlobClient blobClient= blobContainerClient.getBlobClient(file.getOriginalFilename());
        blobClient.upload(file.getInputStream(), file.getSize(),true);

        return file.getOriginalFilename();
    }

    public byte[]  getFile(String filename){
        BlobClient blobClient= blobContainerClient.getBlobClient(filename);
        ByteArrayOutputStream outputStream= new ByteArrayOutputStream();
        blobClient.downloadStream(outputStream);
        final byte[] bytes=outputStream.toByteArray();
        return bytes;
    }
}
