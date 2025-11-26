package com.Steam.management.service.impl;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender emailSender;

    public void sendVerificationEmail(String to, String subject, String text) throws MessagingException {
        /* Email göndermeyi devre dışı bırak - sadece log yaz
        System.out.println("========================================");
        System.out.println("Email gönderilecekti:");
        System.out.println("To: " + to);
        System.out.println("Subject: " + subject);
        System.out.println("Text: " + text);
        System.out.println("========================================");

        // Gerçek email gönderme (devre dışı)

        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(text, true);

        emailSender.send(message);

    }
}

